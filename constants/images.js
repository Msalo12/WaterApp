/**
 * Import SVG images from their respective file paths.
 */
import Add_to_favourite from "../assets/images/Add_to_favourite.svg";
import Bonus_Instructions from "../assets/images/Bonus_Instructions.svg"; 
import Did_not_found from "../assets/images/Did_not_found.svg";
import Congratulation from "../assets/images/Congratulation.svg";
import Invite_friends from "../assets/images/Invite_friends.svg";
import Login from "../assets/images/Login.svg";
import Personal_information_bonus from "../assets/images/Personal_information_bonus.svg";
import Rectangle from "../assets/images/Rectangle.svg";
import Vector_L from "../assets/images/Vector_L.svg";
import Vector_W from "../assets/images/Vector_W.svg";
import Map_nearest_wash from "../assets/images/Map_nearest_wash.svg";
import Box1 from "../assets/images/Box1.png";
import Box2 from "../assets/images/Box2.png";
import Box3 from "../assets/images/Box3.png";
import Box4 from "../assets/images/Box4.png";
import Scan from "../assets/images/Scan.svg"



/**
 * An object representing various SVG images used in the application.
 * The keys are image names, and the values are the corresponding SVG components.
 */
const IMAGES = {
    favourite_add: Add_to_favourite, // The 'favourite_add' key represents the SVG image for adding to favorites.
    instruct_bonus: Bonus_Instructions, // The 'instruct_bonus' key represents the SVG image for bonus instructions.
    not_found: Did_not_found, // The 'not_found' key represents the SVG image for a not found scenario.
    congrats: Congratulation, // The 'congrats' key represents the SVG image for a congratulatory message.
    friends_invite: Invite_friends, // The 'friends_invite' key represents the SVG image for inviting friends.
    login_img: Login, // The 'login_img' key represents the SVG image for the login screen.
    pers_info_bonus: Personal_information_bonus, // The 'pers_info_bonus' key represents the SVG image for personal information bonus.
    rectangle_gradient: Rectangle,
    letter_l: Vector_L,
    letter_w: Vector_W,
    nearest_wash_map: Map_nearest_wash,
    box1: Box1,
    box2: Box2,
    box3: Box3,
    box4: Box4,
    scan: Scan,
};

// Export the IMAGES object so that it can be used in other modules.
export { IMAGES };