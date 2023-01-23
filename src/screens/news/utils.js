export const processGetArticlesResponse = (data) => {
  const articles = [];

  data.forEach((element) => {
    articles.push({
      id: element.id.toString(),
      title: element.title.replace(/\\/g, ""),
      image: element.main_gallery_item?.filename_webp,
      isSquareImage: element.main_gallery_item?.image_x === element.main_gallery_item?.image_y,
      teamImg: element.teams && element.teams[0]?.logo_path,
      publishDate: element.publish_date,
      commentsCount: element.comments_count,
      content: element.content,
      plainContent: element.plain_content,
      mainVideoUrl: element.main_video_url,
      likedBy: element.liked_by?.join("-") || "",
      likedCount: element.liked_by?.length || 0,
      shareLink: element.share_link,
      hasEmbed: element.has_embed,
      dateTitle: (element.teams && element.teams[0]?.name_geo) || "",
      transferStatus: element.transfer_status,
      transferPlayerName: element.players?.length ? element.players[0]?.common_name : "",
      transferPlayerImage: element.players?.length ? element.players[0]?.image_path : "",
      linkedMatchScore: element.linked_match_score,
      matchId: element.match_id,
      poll: element.poll,
      quiz: element.quiz,
    });
  });

  return articles;
};
