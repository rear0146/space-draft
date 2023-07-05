"use client";
import React, { useState } from "react";
import styles from './page.module.css'

const positionListAll:string[] = ['GK','AC','CF','FB','FB','CB','CB','IH','IH','WG','WG','Free','Free','Free','Free','Free']

const shuffleArray = (array:string[]) => {
  const cloneArray = [...array]
  for (let i = cloneArray.length - 1; i >= 0; i--) {
    let rand = Math.floor(Math.random() * (i + 1))
    let tmpStorage = cloneArray[i]
    cloneArray[i] = cloneArray[rand]
    cloneArray[rand] = tmpStorage
  }
  return cloneArray
}

export default function Home() {
  const [selectedPositionList, selectPosition] = useState<string[]>([]);
  const [positionList, setPositionList] = useState(positionListAll);
  const nextPositionLot:any = () => {
    const nextPositionIndex = Math.floor(Math.random() * positionList.length);
    selectPosition([...selectedPositionList, positionList[nextPositionIndex]])
    setPositionList(positionList.filter((e,index) => index !== nextPositionIndex))
  }

  const [member, setMember] = useState('');
  const [memberList, setMemberList] = useState<string[]>([]);
  const [memberDraft, setMemberDraft] = useState<string[]>([]);
  const handleMemberList:any = () => {
    setMemberList(member.split(','))
    setMemberDraft(member.split(','))
  }
  const handleMemberDraft:any = () => {
    setMemberDraft(shuffleArray(memberList))
  }

  return (
    <main className={styles.main}>
      <div className={styles.card}>
        <input onChange={(e) => setMember(e.target.value)} />
        <button onClick={handleMemberList}>submit</button>
      </div>
      <div className={styles.card}>
      <button onClick={handleMemberDraft}>draft</button>
        <ul>
          {memberDraft.map((m:string,index:number)=>
            <li key={index}>{index+1}位:{m}</li>
          )}
        </ul>
      </div>
      <div className={styles.card}>
        <button onClick={nextPositionLot}>next position</button>
        <p>selected positions</p>
        {selectedPositionList.map((m:string,index:number)=>
            <li key={index}>{index+1}人目：{m}</li>
          )}
          <br/>
          <p>position list</p>
          {positionList.map((m:string,index:number)=>
            <li key={index}>{m}</li>
          )}
      </div>
    </main>
  )
}
