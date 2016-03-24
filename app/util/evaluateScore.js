'use strict';


function evaluateScore(score) {
  if (score == 0) {
    return "Zero Depression";
  } else if (score == 1 || score == 2) {
    return "Minimal Depression";
  } else if (score == 3 || score == 4) {
    return "Mild Depression";
  } else if (score == 5 || score == 6) {
    return "Moderate Depression";
  } else if (score == 7 || score == 8) {
    return "Moderately Severe Depression";
  } else if (score == 9 || score == 10) {
    return "Severe Depression";
  } else {
    return "No Assessment";
  }
}

module.exports = evaluateScore;