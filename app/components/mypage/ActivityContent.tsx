import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Post, Comment } from '@/app/types/data';
import PostComponent from '../common/Post';
import CommentComponent from '../common/Comment';

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;

  > *:not(:last-child) {
    margin-bottom: 32px;
  }
`;

const FilterListLayoutDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

const FilterListButton = styled.button<{ $isActive: boolean }>`
  font-size: 20px;
  padding: 8px 10px;
  border-radius: 8px;
  background-color: ${({ $isActive }) => ($isActive ? '#c3c3c3' : 'white')};
  border: 1px solid #c3c3c3;

  &:not(:last-child) {
    margin-right: 14px;
  }
`;

const filterList = [
  {
    text: '전체',
    value: 'all',
  },
  {
    text: '글',
    value: 'post',
  },
  {
    text: '댓글',
    value: 'comment',
  },
];

const userList: Array<UserPost | UserComment> = [
  {
    id: 1,
    reaction: '🥹',
    date: new Date(),
    title: '안녕하세요. 궁금한게 있습니다.',
    content: '본문 내용입니다.',
    nickname: 'ohdal',
    modified: false,
    solved: false,
    // 해당 api type 반드시 필요 !
    type: 'post',
  },
  {
    id: 1,
    date: new Date(),
    postTitle: '안녕하세요. 궁금한게 있습니다.',
    comment: '네 제가 답해드리겠습니다 ~',
    type: 'comment',
  },
];

type UserPost = Post & { reaction: string; type: string };
type UserComment = Comment & { type: string };
export default function ActivityContent() {
  const [filter, setFilter] = useState<string>(filterList[0].value);
  const [data, setData] = useState<Array<UserPost | UserComment> | null>(null);
  const [list, setList] = useState<Array<UserPost | UserComment> | null>(null);
  useEffect(() => {
    if (!data) return;
    console.log('필터 변경', filter);

    if (filter === 'all') setList(data);
    else setList(data?.filter((v) => v.type === filter));
  }, [filter, data]);

  useEffect(() => {
    // TODO: 사용자 활동내역 api 연동
    setTimeout(() => {
      setData(userList);
      setList(userList);
    }, 2000);
  }, []);

  return (
    <ContentContainer>
      <FilterListLayoutDiv>
        {filterList.map((v, idx) => (
          <FilterListButton
            key={`filter-${idx}`}
            $isActive={filter === v.value}
            onClick={() => setFilter(v.value)}
          >
            {v.text}
          </FilterListButton>
        ))}
      </FilterListLayoutDiv>

      {list ? (
        list.map((v, idx) =>
          v.type === 'post' ? (
            <PostComponent key={`post-${idx}`} {...(v as UserPost)} />
          ) : (
            <CommentComponent key={`comment-${idx}`} {...(v as UserComment)} />
          ),
        )
      ) : (
        <div>Loading...</div>
      )}
    </ContentContainer>
  );
}
