module {
  // Anniversary start date: June 15, 2023 (Unix timestamp in nanoseconds)
  // June 15, 2023 00:00:00 UTC = 1686787200 seconds = 1686787200_000_000_000 nanoseconds
  let anniversaryNs : Int = 1_686_787_200_000_000_000;

  public func checkPassword(password : Text) : Bool {
    password == "candybara" or password == "pixellove";
  };

  public func getAnniversaryTimestamp() : Int {
    anniversaryNs;
  };
};
