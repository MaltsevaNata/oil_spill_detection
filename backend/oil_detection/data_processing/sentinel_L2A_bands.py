import json
import requests
import io

from PIL import Image


def get_L2A_bands_in_bbox(upper_left, upper_right, bottom_left, bottom_right, timestamp_from, timestamp_to):
    token = 'eyJraWQiOiJzaCIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI4YjNhODhjMS0wYWNlLTRiOGUtODFlMS1mMGQyYjliMDJlYzYiLCJhdWQiOiIzZjVjNGE2MS05MWYyLTQzMDItODMxMi00ZTEyNTMyMDVkNTEiLCJqdGkiOiIwN2U2NmExNC1kODE1LTQxYzAtYWFjYi0yMTMzOGVjZDE0NGQiLCJleHAiOjE2Mzg1NTYxODAsIm5hbWUiOiJOYXRhbGlhIE1hbHRzZXZhIiwiZW1haWwiOiJuYXRhbGlhX21hbHRzZXZhQGJrLnJ1IiwiZ2l2ZW5fbmFtZSI6Ik5hdGFsaWEiLCJmYW1pbHlfbmFtZSI6Ik1hbHRzZXZhIiwic2lkIjoiOTgxMDkwYmQtMDY5Yi00M2JhLWI5ODgtODEwMDY4OTgxNzI1IiwiZGlkIjoxLCJhaWQiOiJlMjY3YmE2Ny1lMDFiLTRiYWYtOTFlMy02ZTA5OGJiOWQ1MWQiLCJkIjp7IjEiOnsicmEiOnsicmFnIjoxfSwidCI6MTEwMDB9fX0.WnDTlLcxvaJhKZBoWR2LE-VMJZzFCyiu7akKwJshjsiR8Ndn9RwUGeru0CySOK1vSI-c-7DlyHUvQCbS0pnQvhsbAcghJczgxZv3gZLMnisw_jb-9h9vcJK5Q7feYZ5AN_R-BrpW6yx6eMheLwK68_ZleRS4ELGHwveJJeLRsLxoF2MfrKsreUHkvAzHR0kagPcH9Dnzn0xfBpCwZ5ZEEFKDQ0uFz8gwgSh1uMXme94Uay3lQbH7SpMDqQZmWKSlfIN76vSCmA3U2t2vJn8CyjGfx_e2gJFs4Wj_BgkbrQ-lBWDB_oAEhr5AetUfouRZRZLCFUXszoGNRCZMnoqAZg'
    url = 'https://services.sentinel-hub.com/api/v1/process'
    headers = {'Authorization': f'Bearer {token}', 'Content-Type': 'application/json'}
    data = json.dumps(json.load(open('data.json')))
    r = requests.post(url, data=data, headers=headers)
    '''img = Image.frombytes(
        "1", (64,64), r.content, "raw")
    img.save("file.tiff")'''
    with open("file.tiff", "wb") as f:
        f.write(r.content)
    return "file.tiff"


