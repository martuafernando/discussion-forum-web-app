import React from "react";
import ThreadItem from "../thread-item/ThreadItem";
import './ThreadList.css'

export default function ThreadList() {
  return (
    <div className="thread-list">
      <h2 className="thread-list__title">Postingan</h2>
      <div className="thread-list__content">
        <ThreadItem
          title='Cara cepat hidup'
          content='Testing yok mantap mantap pol bet cok'
          createdAt='2022-12-13T00:00:00.000Z'
          category='General'
          upVotes={['1', '2']}
          downVotes={['1', '2']}
          totalComments='3'
          ownerId='1'
        />
        <ThreadItem
          title='Cara cepat hidup'
          content='Testing yok mantap mantap pol bet cok'
          createdAt='2022-12-13T00:00:00.000Z'
          category='General'
          upVotes={['1', '2']}
          downVotes={['1', '2']}
          totalComments='3'
          ownerId='1'
        />
      </div>
    </div>
  )
}