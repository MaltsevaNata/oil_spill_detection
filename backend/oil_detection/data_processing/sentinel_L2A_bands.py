import json
import requests


def get_L2A_bands_in_bbox(upper_left, upper_right, bottom_left, bottom_right, timestamp_from, timestamp_to):
    token = ''
    url = 'https://services.sentinel-hub.com/api/v1/process'
    headers = {'Authorization': f'Bearer {token}', 'Content-Type': 'application/json'}
    data = json.dumps(json.load(open('data.json')))
    r = requests.post(url, data=data, headers=headers)
    with open("file.jpg", "wb") as f:
        f.write(r.content)
    return "file.tiff"


