export enum CheckMessageStatus {
  INIT = "",
  NICKNAME_ISVALID = "ISVALID",
  NICKNAME_DUPLICATION = "NICKNAME_DUPLICATION",
  NICKNAME_INVALID_SYNTAX = "NICKNAME_INVALID_SYNTAX",
  NICKNAME_LIMIT_SIX = "NICKNAME_LIMIT_SIX",
  INTRODUCE_LIMIT_FIFTEEN = "INTRODUCE_LIMIT_FIFTEEN",
  INTRODUCE_ISVALID = "INTRODUCE_ISVALID",
  KITCHENNAME_LIMIT_FIFTEEN = "KITCHENNAME_LIMIT_FIFTEEN",
}

export enum CommonAlertType {
  DUBBING_OUT = "DUBBING_OUT",
  COMMENT_DELETE = "COMMENT_DELETE",
  CONTENTS_DELETE = "CONTENTS_DELETE",
}

export enum SoundType {
  DEFAULT = "DEFAULT",
  PLAYING = "PLAYING",
  DISABLE = "DISABLE",
}

export enum EmptyType {
  EMPTY_DUB_PRODUCT = "EMPTY_DUB_PRODUCT",
  EMPTY_LIKE_DUB_PRODUCT = "EMPTY_LIKE_DUB_PRODUCT",
  EMPTY_SCRAP_DUB_VIDEO = "EMPTY_SCRAP_DUB_VIDEO",
  EMPTY_COMMENT = "EMPTY_COMMENT",
  EMPTY_VOTE = "EMPTY_VOTE",
  NO_RECOMMEND = "NO_RECOMMEND",
  KOREAN_VOTE = "KOREAN_VOTE",
}

export enum SituationType {
  PLACE_1 = "PLACE_1",
  PLACE_2 = "PLACE_2",
  EMOTION = "EMOTION",
  COUNTRY = "COUNTRY",
}

export enum DubType {
  DUB_VIDEO = "DUB_VIDEO",
  DUB_PRODUCT = "DUB_PRODUCT",
}

export enum LangType {
  ENGLISH = "english",
  KOREAN = "korean",
}
