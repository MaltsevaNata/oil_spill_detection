import requests
from xml.etree import ElementTree


URL =  'https://api.openstreetmap.org/api/0.6/map'
url_way = 'https://api.openstreetmap.org/api/0.6/way'
url_node = 'https://api.openstreetmap.org/api/0.6/node'

def get_pipeline_from_bbox(westernmost,southernmost,easternmost,northernmost):
    bbox = {'bbox':f'{westernmost},{southernmost},{easternmost},{northernmost}'}
    r = requests.get(URL, params=bbox)

    tree = ElementTree.fromstring(r.content)
    pipeline_dict = {}

    for way in tree.findall('way'):
        way_items = way.attrib
        r = requests.get(url_way + f'/{way_items["id"]}')
        tree = ElementTree.fromstring(r.content)
        for tag in tree.iter('tag'):
            tag = tag.attrib
            if tag['k'] == 'man_made' and tag['v'] == 'pipeline':
                coord_list = []
                for nd in tree.iter('nd'):
                    nd = nd.attrib
                    r = requests.get(url_node + f'/{nd["ref"]}')
                    tree_coord = ElementTree.fromstring(r.content).find('node').attrib
                    print(tree_coord)
                    coord_list.append((tree_coord['lat'], tree_coord['lon']))
                pipeline_dict[f'pipeline_{way_items["id"]}'] = coord_list
    return pipeline_dict


