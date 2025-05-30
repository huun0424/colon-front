'use client';

import useCommentsQuery from '@/app/api/comment/[postId]/queries';
import useAuth from '@/app/hooks/useAuth';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import CommentItem from './CommentItem';
import Selector from '@/app/components/common/Selector';
import { isEmpty } from 'lodash';
import { GetCommentsResponseItem } from '@/app/api/comment/[postId]/type';
import Section from '@/app/components/common/Section';
import QnACommentWrite from './QnACommentWrite';
import AcceptCommentItem from './AcceptCommentItem';

interface Props {
  postId: string;
  acceptedCommentId: number[];
  postAuthor: string;
}

const AcceptCommentTitleP = styled.p`
  ${({ theme }) => theme.font.body1};
  padding: 0px 20px 10px;

  ${({ theme }) => theme.mediaQuery.mobile} {
    padding: 0 20px;
  }
`;

const AcceptCommentListWrapperUl = styled.ul`
  overflow: hidden;
  width: 100%;
  max-width: 700px;
  margin: 24px auto 0;

  ${({ theme }) => theme.mediaQuery.mobile} {
    border-top: none;
    border-bottom: 1px solid ${({ theme }) => theme.color.line.solid.neutral};

    & > li:not(:last-of-type) {
      border: none;
    }
  }
`;

const ConatinerDiv = styled.div`
  max-width: 700px;
  width: 100%;
  margin: 0 auto;
`;

const FilterDiv = styled.div`
  margin: 12px 0 6px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
`;

const TitleP = styled.p`
  ${({ theme }) => theme.font.body1};
`;

const QnACommentList = ({ postId, acceptedCommentId, postAuthor }: Props) => {
  const [commentList, setCommentList] = useState<GetCommentsResponseItem[]>([]);
  const [openedNestedComment, setOpenedNestedComment] = useState<{
    isOpen: boolean;
    commentId: number;
  }>({ isOpen: false, commentId: -1 });

  const { data } = useCommentsQuery(postId);

  const { userInfo } = useAuth();

  const isAuthor = useMemo(() => postAuthor === userInfo?.user?.nick_name, [userInfo]);
  const acceptCommentList = useMemo(
    () => data?.filter((item) => acceptedCommentId?.includes(item.id)),
    [data, acceptedCommentId],
  );

  const handleSortList = useCallback(
    (type: 'updated' | 'reaction') => {
      const nextList = [...commentList];

      if (type === 'updated') {
        nextList.sort((_prev, _next) => (_prev.id > _next.id ? 1 : -1));
      }

      if (type === 'reaction') {
        nextList.sort((_prev, _next) => (_prev.reaction_count > _next.reaction_count ? -1 : 1));
      }

      setCommentList(nextList);
    },
    [commentList],
  );

  const handleChangeNestedCommentVisible = useCallback(
    (isOpen: boolean, commentId: number) => {
      setOpenedNestedComment({ isOpen, commentId });
    },
    [setOpenedNestedComment],
  );

  useEffect(() => {
    if (data && !isEmpty(data) && isEmpty(commentList)) {
      setCommentList(data);
    }
  }, [data]);

  return (
    <>
      {acceptCommentList && acceptCommentList?.length > 0 && (
        <Section direction="column" padding="0">
          <AcceptCommentListWrapperUl>
            <li>
              <AcceptCommentTitleP>채택 답변</AcceptCommentTitleP>
            </li>
            {acceptCommentList?.map(
              ({
                id,
                author_nickname,
                created_at,
                updated_at,
                comment,
                author_major,
                reaction_count,
                nestedComments,
              }) => {
                return (
                  <li key={`accept-comment-${id}`}>
                    <AcceptCommentItem
                      postId={postId}
                      commentId={id}
                      authorMajor={author_major}
                      authorNickName={author_nickname}
                      createdAt={created_at}
                      updatedAt={updated_at}
                      isSelected={acceptedCommentId?.includes(id)}
                      activeReport={false}
                      comment={comment}
                      likeCount={reaction_count}
                      nestedCommentCount={nestedComments?.length ?? 0}
                      acceptCommentList={acceptedCommentId || []}
                    />
                  </li>
                );
              },
            )}
          </AcceptCommentListWrapperUl>
        </Section>
      )}

      <Section direction="column" padding="0">
        <ConatinerDiv>
          <FilterDiv>
            <TitleP>댓글</TitleP>
            <Selector defaultOption={{ idx: 0, text: '정렬' }}>
              <Selector.Option
                idx={0}
                text="시간순"
                clickEvent={() => {
                  handleSortList('updated');
                }}
              />
              <Selector.Option
                idx={1}
                text="반응순"
                clickEvent={() => {
                  handleSortList('reaction');
                }}
              />
            </Selector>
          </FilterDiv>

          <ul>
            {commentList.map(
              ({
                id,
                author_nickname,
                created_at,
                updated_at,
                comment,
                original_comment,
                nestedComments,
                author_major,
                reaction_count,
              }) => {
                const isAuthorComment = userInfo?.user?.nick_name === author_nickname;
                const isAcceptComment = acceptCommentList?.some((v) => v.id === id);
                return (
                  <React.Fragment key={`comment-item-${id}`}>
                    <li>
                      {isAcceptComment ? (
                        <AcceptCommentItem
                        postId={postId}
                        commentId={id}
                        authorMajor={author_major}
                        authorNickName={author_nickname}
                        createdAt={created_at}
                        updatedAt={updated_at}
                        isSelected={acceptedCommentId?.includes(id)}
                        activeReport={true}
                        comment={comment}
                        likeCount={reaction_count}
                        nestedCommentCount={nestedComments?.length ?? 0}
                        acceptCommentList={acceptedCommentId || []}
                      />
                      ) : (
                        <CommentItem
                          postId={postId}
                          commentId={id}
                          isNestedComment={!!original_comment}
                          authorMajor={author_major}
                          authorNickName={author_nickname}
                          createdAt={created_at}
                          updatedAt={updated_at}
                          isSelected={acceptedCommentId?.includes(id)}
                          comment={comment}
                          isVisibleChoice={
                            isAuthor &&
                            !isAuthorComment &&
                            (!acceptedCommentId || acceptedCommentId?.length < 3)
                          }
                          likeCount={reaction_count}
                          nestedCommentCount={nestedComments?.length ?? 0}
                          isOpenNestedCommentWrite={
                            openedNestedComment.isOpen && openedNestedComment.commentId === id
                          }
                          onChangeNestedCommentVisible={(isOpen) => {
                            handleChangeNestedCommentVisible(isOpen, id);
                          }}
                          acceptCommentList={acceptedCommentId || []}
                        />
                      )}
                    </li>
                    {nestedComments?.map((item, idx) => {
                      const isAuthorNestedComment =
                        userInfo?.user?.nick_name === item.author_nickname;
                      return (
                        <li key={`nested-comment-item-${item.id}`}>
                          <CommentItem
                            postId={postId}
                            commentId={item.id}
                            isNestedComment
                            authorMajor={item.author_major}
                            authorNickName={item.author_nickname}
                            createdAt={item.created_at}
                            updatedAt={item.updated_at}
                            isSelected={acceptedCommentId?.includes(item.id)}
                            comment={item.comment}
                            isVisibleChoice={
                              isAuthor &&
                              !isAuthorNestedComment &&
                              (!acceptedCommentId || acceptedCommentId?.length < 3)
                            }
                            likeCount={item.reaction_count}
                            isOpenNestedCommentWrite={
                              openedNestedComment.isOpen &&
                              openedNestedComment.commentId === item.id
                            }
                            onChangeNestedCommentVisible={(isOpen) => {
                              handleChangeNestedCommentVisible(isOpen, item.id);
                            }}
                            acceptCommentList={acceptedCommentId || []}
                          />
                        </li>
                      );
                    })}
                  </React.Fragment>
                );
              },
            )}
          </ul>
        </ConatinerDiv>
      </Section>

      {!openedNestedComment.isOpen && (
        <Section direction="column" padding="0">
          <QnACommentWrite postId={postId} />
        </Section>
      )}
    </>
  );
};

export default QnACommentList;
