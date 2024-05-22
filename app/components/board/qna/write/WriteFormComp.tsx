'use client';

import dynamic from 'next/dynamic';
import { useState, useRef, useMemo } from 'react';
import { UnprivilegedEditor } from 'react-quill';
import styled, { css } from 'styled-components';
import { isEmpty } from 'lodash';
import { JOB_GROUP_TYPES } from '@/app/api/auth/user/type';
import useAuth from '@/app/hooks/useAuth';
import { useInsertPostMutation } from '@/app/api/post/mutations';
import { GetPostResponse } from '@/app/api/post/[id]/type';
import { InsertPostRequest } from '@/app/api/post/type';
import JobGroupList, { JOB_GROUP_LIST_TYPES } from './JobGroupList';
import TagList from './TagList';
import ButtonComp from '@/app/components/common/ButtomComp';

const QuillEditor = dynamic(() => import('@/app/components/common/QuillEditor'), { ssr: false });

interface Props {
  defaultPost?: GetPostResponse;
}

type VAL_TYPE = 'major' | 'title' | 'content';

const ContainerDiv = styled.div`
  padding: 0px 200px;

  ${({ theme }) => theme.mediaQuery.mobile} {
    padding: 0px 20px;
  }
`;

const TitleInputDiv = styled.div`
  width: 100%;
  margin-bottom: 12px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.color.line.solid.normal};

  input {
    width: inherit;
    ${({ theme }) => theme.font.body1}
    color: ${({ theme }) => theme.color.label.normal};
    padding: 12px 16px;
    border-radius: inherit;
    border: none;
    outline: none;
    &::placeholder {
      color: ${({ theme }) => theme.color.interaction.inactive};
    }

    ${({ theme }) => theme.mediaQuery.mobile} {
      ${({ theme }) => theme.font.body2}
    }
  }
`;

const ButtonLayoutDiv = styled.div`
  width: 100%;

  > * {
    float: right;
  }

  :not(:first-of-type) {
    margin-right: 12px;
  }

  ${({ theme }) => theme.mediaQuery.mobile} {
    position: fixed;
    bottom: 52px;
    right: 20px;
  }
`;

const ErrorDiv = styled.div<{ $isError: boolean }>`
  ${({ theme, $isError }) =>
    $isError &&
    css`
      > * {
        position: relative;
        border-color: ${theme.color.status.destructive} !important;
      }
    `}
`;

export const WriteFormComp = (props: Props) => {
  const { defaultPost } = props;
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef({ html: '', text: '' });
  
  const [major, setMajor] = useState<JOB_GROUP_LIST_TYPES | undefined>(
    defaultPost?.requested_major,
  );
  const [val, setVal] = useState<{ isCheck: boolean; list: string[] }>({
    isCheck: false,
    list: [],
  });

  const { userInfo } = useAuth();
  const { mutateAsync: postMutation } = useInsertPostMutation();

  const handleClickSave = async (isTemporary: boolean) => {
    if (isEmpty(userInfo)) return;
    if (validate()) return;

    const post: InsertPostRequest = {
      status: isTemporary ? 'EDITING' : 'COMPLETE',
      requested_major: major as JOB_GROUP_LIST_TYPES,
      title: titleRef.current?.value ?? '',
      body: contentRef.current.html,
      preview_body: contentRef.current.text,
      author_major: userInfo?.user.major as JOB_GROUP_TYPES,
      author_nickname: userInfo?.user.nick_name,
      author_profile_url: userInfo?.user.profile_url,
      // tags: [],
    };

    await postMutation(post);
  };

  const validate = (): boolean => {
    const title = titleRef.current?.value.trim() ?? '';
    const content = contentRef.current.text.trim();

    const valList: VAL_TYPE[] = [];

    // TODO: tooltip 알림 띄우기
    if (!major) valList.push('major');
    if (title.length < 10) valList.push('title');
    if (content.length < 30) valList.push('content');

    setVal({ isCheck: true, list: valList });

    return valList.length > 0 ? true : false;
  };

  const errorCheck = (str: string): boolean => {
    return val.isCheck && val.list.includes(str);
  };

  const setEditor = (editor: UnprivilegedEditor) => {
    contentRef.current.html = editor.getHTML();
    contentRef.current.text = editor.getText().replaceAll('\n', ' ');
  };

  return (
    <ContainerDiv>
      <JobGroupList jobGroup={major} onClick={(v) => setMajor(v)} />
      <ErrorDiv $isError={errorCheck('title')}>
        <TitleInputDiv>
          <input
            ref={titleRef}
            placeholder="글 제목은 질문 키워드를 넣어주시면 좋아요!"
            defaultValue={defaultPost?.title}
          />
        </TitleInputDiv>
      </ErrorDiv>
      <ErrorDiv $isError={errorCheck('content')}>
        <QuillEditor setEditor={setEditor} initValue={defaultPost?.body} />
      </ErrorDiv>
      <TagList />
      <ButtonLayoutDiv>
        <ButtonComp.Solid
          text="질문하기"
          size="lg"
          onClick={() => handleClickSave(false)}
          isActive
        />
        <ButtonComp.OutlinedPrimary
          text="임시저장"
          size="lg"
          onClick={() => handleClickSave(true)}
          isActive
        />
      </ButtonLayoutDiv>
    </ContainerDiv>
  );
};

export default WriteFormComp;
