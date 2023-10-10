export const PostActions = {
  SUBMIT_POST: "SUBMIT_POST",
  HANDLE_ERROR: "HANDLE_ERROR",
  ADD_LIKE: 'ADD_LIKE',
  ADD_COMMENT:"ADD_COMMENT",



};

export const postsStates = {
  error: false,
  post: [],
  LIKES: [],
  comments:[],

};
export const PostsReducer = (state, action) => {
  switch (action.type) {
    case PostActions.SUBMIT_POST:
      return {
        ...state,
        error: false,
        posts: action.posts,
      };
    case PostActions.ADD_LIKE:
      return {
        ...state,
        error: false,
        likes: action.likes,

      };
      case PostActions.ADD_COMMENT:
      return {
        ...state,
        error: false,
        comments: action.comments,

      }


    case PostActions.HANDLE_ERROR:
      return {
        ...state,
        error: true,
        posts: [],
      };
  }
};
