import { NextResponse } from 'next/server';
import { createClient } from '@/app/utils/supabase/server';
import { getHost } from '@/app/utils/host';

export async function GET(request: Request, { params }: { params: { postId: string } }) {
  const host = getHost();

  const supabase = await createClient();

  try {
    const { data, error: commentsGetError } = await supabase
      .from('comments')
      .select(
        'id, original_comment, comment, created_at, updated_at, post_id, author_nickname, author_major, reaction_count ',
      )
      .eq('post_id', params.postId)
      .order('id', { ascending: true });

    if (commentsGetError) {
      return NextResponse.json({
        success: false,
        ...commentsGetError,
      });
    }

    return NextResponse.json({
      success: true,
      data: [...data],
    });
  } catch (error) {
    return NextResponse.redirect(`${host}/error/500`);
  }
}
