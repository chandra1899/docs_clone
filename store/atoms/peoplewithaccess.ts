"use client"
import { atom } from 'recoil'

export interface PersonwithAccess {
  _id : string,
  expirationDate : string,
  expirationOn : boolean,
  role : string,
  roomName : string,
  user : {
    name : string,
    email : string
  }
}

export const peoplewithaccess = atom<PersonwithAccess[]>({
    key: 'peoplewithaccess',
    default:[]
  });