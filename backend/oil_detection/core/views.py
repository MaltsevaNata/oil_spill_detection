import datetime

from django.shortcuts import render
from django.views import View
from django.views.decorators.csrf import csrf_exempt

from data_processing.pipeline import detection_pipeline
from rest_framework.decorators import api_view
from rest_framework.response import Response


@csrf_exempt
@api_view(['POST'])
def detect_spills(request):
    print(request.data)
    region = request.data["region"]
    north_east = right_upper_corner = request.data["north_east"]
    south_west = left_bottom_corner = request.data["south_west"]
    print(north_east)
    left_upper_corner = [south_west['lat'], north_east['lng']]
    right_bottom_corner = [north_east['lat'], south_west['lng']]
    markers = detection_pipeline(region, left_upper_corner, right_upper_corner, left_bottom_corner, right_bottom_corner,
                       datetime.datetime.now()-datetime.timedelta(minutes=5), datetime.datetime.now())
    print(markers)
    return Response(status=200, data=markers)

