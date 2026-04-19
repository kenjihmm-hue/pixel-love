import List "mo:core/List";
import Types "../types/photos";

module {
  public func getAll(photos : List.List<Types.PhotoMeta>) : [Types.PhotoMeta] {
    photos.toArray();
  };

  public func initSampleData(photos : List.List<Types.PhotoMeta>) {
    let samples : [Types.PhotoMeta] = [
      { id = 1; caption = "Falak — portrait"; url = "/assets/photos/photo-01.jpg"; dateTaken = "2023" },
      { id = 2; caption = "Us in matching outfits 💕"; url = "/assets/photos/photo-02.jpg"; dateTaken = "2023" },
      { id = 3; caption = "Steps together"; url = "/assets/photos/photo-03.jpg"; dateTaken = "2023" },
      { id = 4; caption = "Falak blue top selfie"; url = "/assets/photos/photo-04.jpg"; dateTaken = "2023" },
      { id = 5; caption = "Falak with sunglasses ✨"; url = "/assets/photos/photo-05.jpg"; dateTaken = "2023" },
      { id = 6; caption = "Falak flower in hair 🌸"; url = "/assets/photos/photo-06.jpg"; dateTaken = "2023" },
      { id = 7; caption = "Falak sideways selfie"; url = "/assets/photos/photo-07.jpg"; dateTaken = "2023" },
      { id = 8; caption = "Aidan nd Falak — Sparkle Sea 🌊"; url = "/assets/photos/photo-08.jpg"; dateTaken = "2023" },
      { id = 9; caption = "Aidan mirror selfie 🪞"; url = "/assets/photos/photo-09.jpg"; dateTaken = "2023" },
      { id = 10; caption = "Aidan daisy in hair 🌼"; url = "/assets/photos/photo-10.jpg"; dateTaken = "2023" },
    ];
    for (p in samples.values()) {
      photos.add(p);
    };
  };
};
