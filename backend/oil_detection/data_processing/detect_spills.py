from .sentinel_L2A_bands import get_L2A_bands_in_bbox


def detection_pipeline(upper_left, upper_right, bottom_left, bottom_right, timestamp_from, timestamp_to):
    satellite_band = get_L2A_bands_in_bbox(upper_left, upper_right, bottom_left, bottom_right, timestamp_from, timestamp_to)
    spills_coords = detect_spills(satellite_band)
    return spills_coords


def detect_spills(band):
    # returns list of spills bboxes
    northEast = [60.84837464970738, 68.58131469923769]
    southWest = [60.79402357411143, 68.66262329298769]
    return [[northEast, southWest]]