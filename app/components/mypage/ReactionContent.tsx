'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Post } from '@/app/types/data';
import PostCompoment from '../common/Post';

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;

  > *:not(:last-child) {
    margin-bottom: 32px;
  }
`;

const ReactionP = styled.p`
  font-size: 35px;
  margin-right: 12px;
`;

const time = new Date().getTime();
const postList: Array<Post & { reaction: string }> = [
  {
    id: 1,
    reaction: '🥹',
    date: new Date(),
    title: '안녕하세요. 궁금한게 있습니다.',
    content: '본문 내용입니다.',
    nickname: 'ohdal',
    modified: false,
    solved: false,
  },
  {
    id: 2,
    reaction: '🧡',
    date: new Date(time - 1000 * 60 * 4),
    title:
      '안녕하세요. 75자 테스트를 해볼게요. 얼마나 적어야 75자가 넘을까요? 아메리카노 거의 다 마셔가네요. 배가 고프네요. 아직도 75자가 안넘네요?',
    content: '본문 내용입니다.',
    nickname: 'ohdal',
    modified: true,
    solved: false,
  },
  {
    id: 3,
    reaction: '😡',
    date: new Date(time - 1000 * 60 * 60 * 23),
    title: '이것은 해결된 질문입니다 :)',
    content: '본문 내용입니다.',
    nickname: 'ohdal',
    modified: false,
    solved: true,
  },
  {
    id: 4,
    reaction: '💚',
    date: new Date(time - 1000 * 60 * 60 * 24 * 2),
    title: '해결도되고 수정도 된 질문입니다.',
    content: '본문 내용입니다.',
    nickname: 'ohdal',
    modified: true,
    solved: true,
  },
  {
    id: 5,
    reaction: '🤣',
    date: new Date(time - 1000 * 60 * 60 * 24 * 9),
    title: '해결도되고 수정도 된 질문입니다.',
    content: '본문 내용입니다.',
    nickname: 'ohdal',
    modified: true,
    solved: true,
  },
];

const ReactionContent = () => {
  const [list, setList] = useState<typeof postList | null>(null);

  useEffect(() => {
    // TODO: 반응한 글 리스트 불러오는 api 연동 (Infinity Scroll)
    setTimeout(() => {
      setList(postList);
    }, 2000);
  }, []);

  return (
    <ContentContainer>
      {list ? (
        list.map((post, idx) => (
          <PostCompoment key={`reaction-${idx}`} {...post}>
            <ReactionP>{post.reaction}</ReactionP>
          </PostCompoment>
        ))
      ) : (
        // TODO: 로딩 or 게시물 없음 화면
        <div>Loading...</div>
      )}
    </ContentContainer>
  );
};

export default ReactionContent;
