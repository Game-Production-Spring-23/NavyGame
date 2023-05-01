import { loadNewHTMLFile, devSkip } from "/lib.js";
import { mainMenu } from "/scenes/00-main-menu/script.js";

export function credits() {
  devSkip(
    "/scenes/00-main-menu/Main-Menu-Scene.html",
    "/scenes/00-main-menu/style.css",
    mainMenu
  );

  //    START INIT    //
  //Get references from document
  const creditsScroll = document.getElementById("creditsScroll");
  const creditsStaff = document.getElementById("creditsStaff");

  //Data
  const credits = `
Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum animi
accusantium, earum quis repellat
expedita officia maiores dolores aspernatur accusamus, ducimus ullam nesciunt possimus vel, ad fuga
in!
Cumque, temporibus? Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos ullam
facilis
soluta facere aliquam ad atque unde, corrupti numquam itaque. Quaerat voluptates quos, eos pariatur
temporibus veritatis tempora delectus earum? Lorem ipsum dolor sit amet consectetur adipisicing
elit.
Deserunt reprehenderit, maiores iure tenetur libero quam sed corporis provident? Quam officiis eos
et
est esse eaque, fugit dolor quo sed nobis.
`;

  //Variables
  let creditsSpeed = 60;

  //Sets credits
  creditsScroll.style.transition = "all " + creditsSpeed + "s";
  creditsStaff.innerHTML = "<p>" + credits + "</p>";

  startCredits();
  //    END INIT    //

  function startCredits() {
    //Waits 3 seconds on the title before moving
    setTimeout(() => {
      let creditsEndpoint = (creditsScroll.scrollHeight - screen.height) * -1; //Gets the end point where the credits will stop scrolling

      //Moves credits to scroll speed
      creditsScroll.style.transform = "translateY(" + creditsEndpoint + "px)";

      //Backs out to main menu
      setTimeout(() => {
        loadNewHTMLFile(
          "/scenes/00-main-menu/Main-Menu-Scene.html",
          "/scenes/00-main-menu/style.css",
          mainMenu
        );
      }, creditsSpeed * 1000 + 3000);
    }, 3000);
  }
}
