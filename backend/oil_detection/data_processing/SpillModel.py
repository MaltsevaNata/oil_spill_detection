from datetime import datetime
from typing import Optional, List

from pydantic import BaseModel


class OilSpill(BaseModel):
    coord_northwest: List[float]
    coord_southeast: List[float]
    surface_area: Optional[float]
    timestamp: datetime
    damage_score: Optional[float]
    reason: Optional[str]
    region: str