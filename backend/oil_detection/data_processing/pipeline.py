import datetime
import os

import requests

from .pipeline_utils.sentinel_api import get_L2A_bands_in_bbox
from .pipeline_utils.openmap_api import get_area_around, get_pipeline_from_bbox
from .pipeline_utils.clear_data import clear_data
from .detect_spills import detect_spills
from .SpillModel import OilSpill
from .pipeline_utils.damage import calculate_damage


def detection_pipeline(region, upper_left, upper_right, bottom_left, bottom_right, timestamp_from, timestamp_to):
    # input - bbox of region on the map, output - coordinates of oil spills

    # first - get satellite data fron Sentinen API
    satellite_bands = get_L2A_bands_in_bbox(upper_left, upper_right, bottom_left, bottom_right, timestamp_from, timestamp_to)

    # filter the noise, clean data
    cleared_bands = clear_data(satellite_bands)

    # send to ML model to predict oil spills location
    spills_coords = detect_spills(cleared_bands)
    for spill_coord in spills_coords:
        spill = OilSpill(coord_northwest=spill_coord[0], coord_southeast=spill_coord[1], region=region, timestamp=datetime.datetime.now())

        # find reason of the spill
        area_around = get_area_around(spill)

        pipes_near = get_pipeline_from_bbox(**area_around)
        reason = "Неизвестно"
        if pipes_near:
            reason = f"Ближайшие нефтепроводы: {pipes_near}"
        spill.reason = reason

        # calculate the influence for nature
        score = calculate_damage(spill)
        spill.damage_score = score

        # save to the database
        url = os.environ.get("API_URL") + 'oil_spills/'
        response = requests.post(url=url, data=spill)
        response.raise_for_status()

    return spills_coords