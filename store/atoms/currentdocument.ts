"use client"

import { atom } from 'recoil'

interface User {
    name : string,
    email : string
}

export interface CurrentDcoumentType {
  documentName : string,
  ownedBy : User,
  roomName : string,
  settings : {
    s1 : boolean,
    s2 : boolean
  },
  share : {
    generalaccess : {
      role : string,
      value : string
    }
  }
}

export const currentdocument = atom<CurrentDcoumentType | undefined>({
    key : 'currentdocument',
    default : undefined
  });