import React from "react";
import ThreadItem from "../thread-item/ThreadItem";
import './ThreadList.css'

export default function ThreadList() {
  return (
    <div className="thread-list">
      <div className="thread-list">
        <ThreadItem
          title='Cara cepat hidup'
          content='It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here,'
          createdAt='2022-12-13T00:00:00.000Z'
          category='General'
          upVotes={['1', '2']}
          downVotes={['1', '2']}
          totalComments='3'
          ownerId='1'
        />
        <ThreadItem
          title='Cara cepat hidup'
          content='It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here,'
          createdAt='2022-12-13T00:00:00.000Z'
          category='Teknologi'
          upVotes={['1', '2']}
          downVotes={['1', '2']}
          totalComments='3'
          ownerId='1'
        />
      </div>
    </div>
  )
}