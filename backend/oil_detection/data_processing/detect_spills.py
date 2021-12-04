from .pipeline_utils.sentinel_api import get_L2A_bands_in_bbox


def detect_spills(band):
    # returns list of spills bboxes
    # here will be the ML model
    northEast = [60.84837464970738, 68.58131469923769]
    southWest = [60.79402357411143, 68.66262329298769]
    return [[northEast, southWest]]