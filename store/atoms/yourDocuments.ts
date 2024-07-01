"use client"
import { atom } from 'recoil'

export interface YourDocuments {
  documentName : string,
  ownedBy : {
    name : string,
    email : string
  },
  roomName : string,
  updatedAt : string
}

export const yourDocuments = atom<YourDocuments[]>({
    key: 'yourDocuments',
    default:[]
  });