from fastapi import APIRouter, HTTPException, Depends, Query
from app.db.database import get_db
from sqlalchemy.orm import Session
from app.models.group_membership import GroupMembership
from app.schemas.group_membership import GroupMembershipBase, GroupMembershipRead
from app.models.group import Group
from app.schemas.group import GroupRead

router = APIRouter(prefix="/groups/memberships", tags=["groups"])

@router.get("/group/{group_id}", response_model=list[GroupMembershipRead])
def get_memberships_by_group_id(group_id: int, db: Session = Depends(get_db)):
    memberships = db.query(GroupMembership).filter(GroupMembership.group_id == group_id).all()
    if not memberships:
        raise HTTPException(status_code=404, detail="Group memberships not found")
    return memberships

@router.post("/", response_model=GroupMembershipRead)
def create_membership(membership: GroupMembershipBase, db: Session = Depends(get_db)):
    new_membership = GroupMembership(**membership.model_dump())
    db.add(new_membership)
    db.commit()
    db.refresh(new_membership)
    return new_membership

@router.delete("/{group_id}", response_model=GroupMembershipRead)
def delete_membership(group_id: int, user_id: int = Query(...), db: Session = Depends(get_db)):
    membership = db.query(GroupMembership).filter(GroupMembership.group_id == group_id, GroupMembership.user_id == user_id).first()
    if not membership:
        raise HTTPException(status_code=404, detail="Membership not found")
    db.delete(membership)
    db.commit()
    return membership

@router.get("/user/{user_id}", response_model=list[GroupRead])
def get_membership_groups_by_user_id(user_id: int, db: Session = Depends(get_db)):
    memberships = db.query(GroupMembership).filter(GroupMembership.user_id == user_id).all()
    groups = [db.query(Group).filter(Group.id == membership.group_id).first() for membership in memberships]

    return groups   