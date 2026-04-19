import Common "common";

module {
  public type PhotoMeta = {
    id : Common.PhotoId;
    caption : Text;
    url : Text;
    dateTaken : Text;
  };
};
