import { loadNewHTMLFile, devSkip, resetPageCounter } from "/lib.js";
import { mainMenu } from "/scenes/00-main-menu/script.js";

export function credits() {
  devSkip(
    "/scenes/00-main-menu/Main-Menu-Scene.html",
    "/scenes/00-main-menu/style.css",
    () => {resetPageCounter();mainMenu();} // make sure page counter resets when looping all the way around
  );

  //    START INIT    //
  //Get references from document
  const creditsScroll = document.getElementById("creditsScroll");
  const creditsStaff = document.getElementById("creditsStaff");

  //Data
  const credits = `
<p>Kylee Dicken: Artist</p>
<p>Hailey Lundy: Artist</p>
<p>William Rubino: Artist</p>
<p>Trent Wilhelm: Artist</p>
<p>Maddie Pasquale: Artist, Madroy's Funny Poll Creator</p>
<p>Angelo Allen: Artist, Sound Producer, Game Designer, Writer</p>
<p>Mathew Powers: Chief Poll Taker, Mathew Powers</p>
<p>Emmanuel Atilola: Game Designer</p>
<p>Cameron Barnes: Game Designer</p>
<p>Lee Cameron: Game Designer</p>
<p>Taylor DeHaven: Game Designer</p>
<p>Bruno Kitazuka: Game Designer</p>
<p>Ethan Mize: Game Designer</p>
<p>Imani Peters: Game Designer, Artist</p>
<p>Nathaniel Greiner: Game Designer, Artist, Writer</p>
<p>Todd Shelton: Foil for Powers</p>
<p>Andrew Choi: Programmer</p>
<p>Logan Orender: Programmer</p>
<p>Devon Richey: Programmer</p>
<p>Edwin Sanchez: Programmer</p>
<p>Hunter Shields: Programmer</p>
<p>Logan Kurker: Programmer</p>
<p>Evie Iles: Programmer, Project Coordinator</p>
<p>John Blue: Writer, Project Coordinator</p>
`;

  //Variables
  let creditsSpeed = 80;

  //Sets credits
  creditsScroll.style.transition = "all " + creditsSpeed + "s";
  creditsStaff.innerHTML = credits;

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
          () => {resetPageCounter();mainMenu();} // make sure page counter resets when looping all the way around
        );
      }, creditsSpeed * 1000 + 3000);
    }, 3000);
  }
}
