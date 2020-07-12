from rest_framework.decorators import api_view
from rest_framework.response import Response
import requests
import urllib
from django.conf import settings
import logging


logger = logging.getLogger(__name__)


@api_view()
def geocode(request):
    try:
        params = urllib.parse.urlencode({"address": request.GET.get("address", ""), "key": settings.API_KEY})
        url = f"https://maps.googleapis.com/maps/api/geocode/json?{params}"
        resp = requests.get(url)
        resp.raise_for_status()
        lat_long = resp.json()["resuts"][0]["geometry"]["location"]
        return Response({"success": True, "data": {"address_geocode": lat_long}})
    except Exception:
        return Response({"success": False, "errors": ["Something failed"]})
