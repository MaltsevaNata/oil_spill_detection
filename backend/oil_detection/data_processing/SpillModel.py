from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class OilSpill(BaseModel):
    coord_northwest: [float, float]
    coord_southeast: [float, float]
    surface_area: Optional[float]
    timestamp: datetime
    damage_score: Optional[float]
    reason: Optional[str]
    region: str