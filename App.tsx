import RockIcon from "./assets/icon-rock.svg";
import PaperIcon from "./assets/icon-paper.svg";
import ScissorsIcon from "./assets/icon-scissors.svg";
import Triangle from "./assets/bg-triangle.svg";
import LogoThree from "./assets/logo.svg";
import RulesImage from "./assets/image-rules.svg";
import { useState } from "react";

function GameLogic(userOption: string, houseOption: string) {
  if (
    (houseOption == "rock" && userOption == "paper") ||
    (houseOption == "paper" && userOption == "scissors") ||
    (houseOption == "scissors" && userOption == "rock")
  ) {
    return "win";
  } else if (
    (userOption == "rock" && houseOption == "paper") ||
    (userOption == "paper" && houseOption == "scissors") ||
    (userOption == "scissors" && houseOption == "rock")
  ) {
    return "lose";
  } else {
    return "draw";
  }
}

function ResultsElement({
  userOption,
  setUserOption,
  houseOption,
  setHouseOption,
  score,
  setScore,
}: {
  userOption: string;
  setUserOption: (userOption: string) => void;
  houseOption: string;
  setHouseOption: (houseOption: string) => void;
  score: number;
  setScore: (score: number) => void;
}) {
  return (
    <div className="container d-flex flex-column justify-content-center">
      <h1 className="display-2 fw-bold text-center text-white mb-2">
        {GameLogic(userOption, houseOption) == "win"
          ? "YOU WIN"
          : GameLogic(userOption, houseOption) == "lose"
          ? "LOSE"
          : "DRAW"}
      </h1>
      <button
        className="btn btn-light btn-retry w-100 mt-2 py-3"
        onClick={() => {
          if (GameLogic(userOption, houseOption) == "win") {
            localStorage.setItem("score", String(score + 1));
            setScore(score + 1);
          }
          setUserOption("");
          setHouseOption("");
        }}
      >
        {" "}
        PLAY AGAIN
      </button>
    </div>
  );
}

function ButtonGroupSelection({
  userOption,
  setUserOption,
  houseOption,
  setHouseOption,
  buttonCount,
  score,
  setScore,
}: {
  userOption: string;
  setUserOption: (userOption: string) => void;
  houseOption: string;
  setHouseOption: (houseOption: string) => void;
  buttonCount: number;
  score: number;
  setScore: (score: number) => void;
}) {
  const isMobile = window.matchMedia("(orientation: portrait)").matches;

  if (buttonCount == 3) {
    if (!userOption) {
      // user hasnt selected an option
      return (
        <div className="container position-relative w-100 h-100 d-flex justify-content-center align-items-center">
          <img src={Triangle} className="w-100" />
          <div className="position-absolute top-0 start-0">
            <GameButton
              type="paper"
              setUserOption={setUserOption}
              setHouseOption={setHouseOption}
            ></GameButton>
          </div>
          <div className="position-absolute top-0 end-0">
            <GameButton
              type="scissors"
              setUserOption={setUserOption}
              setHouseOption={setHouseOption}
            ></GameButton>
          </div>
          <div className="position-absolute bottom-0 start-50 translate-middle-x">
            <GameButton
              type="rock"
              setUserOption={setUserOption}
              setHouseOption={setHouseOption}
            ></GameButton>
          </div>
        </div>
      );
    } else {
      // user has selected an option
      return (
        <div
          className={`container d-flex ${
            isMobile ? "flex-column" : "flex-row"
          }`}
        >
          {!isMobile && (
            <>
              <div className="container d-flex flex-column align-items-center justify-content-center">
                <p className="text-white fw-bold text-center">YOU PICKED</p>
                <GameButton
                  type={userOption}
                  setUserOption={setUserOption}
                  setHouseOption={setHouseOption}
                ></GameButton>
              </div>
              {houseOption && (
                <ResultsElement
                  userOption={userOption}
                  setUserOption={setUserOption}
                  houseOption={houseOption}
                  setHouseOption={setHouseOption}
                  score={score}
                  setScore={setScore}
                ></ResultsElement>
              )}
              <div className="container d-flex flex-column align-items-center justify-content-center">
                <p className="text-white fw-bold text-center">
                  THE HOUSE PICKED
                </p>
                {houseOption && (
                  <GameButton
                    type={houseOption}
                    setUserOption={""}
                    setHouseOption={setHouseOption}
                  ></GameButton>
                )}
              </div>
            </>
          )}
          {isMobile && (
            <>
              <div className="container d-flex flex-row mb-5">
                <div className="container d-flex flex-column align-items-center justify-content-center">
                  <p className="text-white fw-bold text-center">YOU PICKED</p>
                  <GameButton
                    type={userOption}
                    setUserOption={setUserOption}
                    setHouseOption={setHouseOption}
                  ></GameButton>
                </div>
                <div className="container d-flex flex-column align-items-center justify-content-center">
                  <p className="text-white fw-bold text-center">
                    THE HOUSE PICKED
                  </p>
                  {houseOption && (
                    <GameButton
                      type={houseOption}
                      setUserOption={""}
                      setHouseOption={setHouseOption}
                    ></GameButton>
                  )}
                </div>
              </div>
              {houseOption && (
                <ResultsElement
                  userOption={userOption}
                  setUserOption={setUserOption}
                  houseOption={houseOption}
                  setHouseOption={setHouseOption}
                  score={score}
                  setScore={setScore}
                ></ResultsElement>
              )}
            </>
          )}
        </div>
      );
    }
  }
}

function GameButton({
  type,
  setUserOption,
  setHouseOption,
}: {
  type: string;
  setUserOption: any;
  setHouseOption: (houseOption: string) => void;
}) {
  const TypeData: any = {
    rock: {
      color: "#db3052",
      accentColor: "#9b1734",
      svg: RockIcon,
    },
    paper: {
      color: "#4664f4",
      accentColor: "#2945c2",
      svg: PaperIcon,
    },
    scissors: {
      color: "#ea9e11",
      accentColor: "#cb6b18",
      svg: ScissorsIcon,
    },
  };
  return (
    <button
      className="btn rounded-circle p-3 border-5 border-0 border-bottom"
      style={{
        backgroundColor: TypeData[type].color,
        aspectRatio: "1/1",
      }}
      ref={(node) => {
        node?.style.setProperty(
          "border-color",
          TypeData[type].accentColor,
          "important"
        );
      }}
      onClick={() => {
        if (setUserOption) {
          setUserOption(type);
          setHouseOption(
            ["rock", "paper", "scissors"][Math.floor(Math.random() * 3)]
          );
        }
      }}
    >
      <button
        className="btn rounded-circle btn-light p-3 border-5 border-0 border-top"
        style={{ aspectRatio: "1/1" }}
      >
        <div
          className="container d-flex align-items-center justify-content-center"
          style={{ aspectRatio: "1/1" }}
        >
          <img src={TypeData[type].svg} alt="" />
        </div>
      </button>
    </button>
  );
}

function App() {
  const isMobile = window.matchMedia("(orientation: portrait)").matches;
  const [userOption, setUserOption] = useState("");
  const [houseOption, setHouseOption] = useState("");
  const [score, setScore] = useState(
    Number(localStorage.getItem("score")) || 0
  );
  const [isRulesOpen, setIsRulesOpen] = useState(false);
  return (
    <>
      <button
        className="btn border border-white text-white position-absolute bottom-0 end-0 m-4 px-5"
        onClick={() => setIsRulesOpen(true)}
      >
        RULES
      </button>
      {isRulesOpen &&
        (isMobile ? (
          <div
            className="container position-absolute w-100 h-100 bg-white d-flex flex-column align-items-center justify-content-around"
            style={{ zIndex: 999 }}
          >
            <p className="display-2 text-muted fw-bold text-center">RULES</p>
            <img className="mt-4" src={RulesImage} alt="" />
            <button
              className="btn btn-light"
              onClick={() => setIsRulesOpen(false)}
            >
              <i className="bi bi-x text-muted"></i>
            </button>
          </div>
        ) : (
          <div
            className="container position-absolute top-50 start-50 translate-middle bg-white p-3 rounded"
            style={{ width: "fit-content", zIndex: 999 }}
          >
            <div className="container d-flex flex-row justify-content-between">
              <p className="fw-bold text-muted">RULES</p>
              <button
                className="btn btn-light"
                onClick={() => setIsRulesOpen(false)}
              >
                <i className="bi bi-x text-muted"></i>
              </button>
            </div>
            <img className="mt-4" src={RulesImage} alt="" />
          </div>
        ))}
      <div className="container h-100">
        <div className="container border border-white rounded d-flex flex-row p-4 justify-content-between my-5">
          <img src={LogoThree} alt="" />
          <div
            className="container bg-white rounded px-5 m-0 d-flex flex-column align-items-center justify-content-center"
            style={{ width: "fit-content" }}
          >
            <p className="m-0 p-0 text-primary fw-bold">SCORE</p>
            <p className="fs-1 fw-bold text-muted m-0 p-0">{score}</p>
          </div>
        </div>
        <div
          className={`container ${
            userOption
              ? `${isMobile ? "w-100" : "w-75"} h-50`
              : `${isMobile ? "w-100" : "w-25"}`
          } p-0 d-flex`}
          style={{ aspectRatio: "1/1" }}
        >
          <ButtonGroupSelection
            userOption={userOption}
            setUserOption={setUserOption}
            houseOption={houseOption}
            setHouseOption={setHouseOption}
            buttonCount={3}
            score={score}
            setScore={setScore}
          ></ButtonGroupSelection>
        </div>
      </div>
    </>
  );
}

export default App;
