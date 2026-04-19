import AuthLib "../lib/auth";

mixin () {
  public query func checkPassword(password : Text) : async Bool {
    AuthLib.checkPassword(password);
  };

  public query func getAnniversaryTimestamp() : async Int {
    AuthLib.getAnniversaryTimestamp();
  };
};
