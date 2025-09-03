from fastapi import APIRouter, HTTPException, Depends
from fastapi.params import Query
from app.db.database import get_db
from sqlalchemy.orm import Session
from app.models.group_model import Group
from app.schemas.group_schemas import GroupBase, GroupRead
from app.models.group_membership_model import GroupMembership


router = APIRouter(prefix="/groups", tags=["groups"])


@router.post("/", response_model=GroupRead)
def create_group(group: GroupBase, db: Session = Depends(get_db)):
    new_group = Group(**group.model_dump())
    db.add(new_group)
    db.commit()
    db.refresh(new_group)
    return new_group

@router.delete("/{group_id}", response_model=GroupRead)
def delete_group(group_id: int, db: Session = Depends(get_db)):
    group = db.query(Group).filter(Group.id == group_id).first()
    if not group:
        raise HTTPException(status_code=404, detail="Group not found")
    db.delete(group)
    db.commit()
    return group

@router.get("/group_admin/{group_id}", response_model=int)
def get_group_admin_by_group_id(group_id: int, db: Session = Depends(get_db)):
    group = db.query(Group).filter(Group.id == group_id).first()
    if not group or group.owner_id is None:
        raise HTTPException(status_code=404, detail="Admin not found for this group")
    return group.owner_id

@router.get("/all", response_model=list[GroupRead])
def get_all_groups(db: Session = Depends(get_db)):
    groups = db.query(Group).limit(10).all()
    if not groups:
        raise HTTPException(status_code=404, detail="No groups found")
    return groups

@router.get("/{group_id}", response_model=GroupRead)
def get_group_by_id(group_id: int, db: Session = Depends(get_db)):
    group = db.query(Group).filter(Group.id == group_id).first()
    if not group:
        raise HTTPException(status_code=404, detail="Group not found")
    return group

@router.get("/search/{user_id}", response_model=list[GroupRead])
def search_new_groups(
    user_id: int,
    query: str,
    limit: int = 10,
    db: Session = Depends(get_db)
):
    groups = db.query(Group).filter(Group.name.ilike(f"%{query}%")).limit(limit).all()
    if not groups:
        raise HTTPException(status_code=404, detail="No groups found")
    return groups


