const Controller = require("./base");
const ContestRepository = require("../repositories/contestRepository");
const contestRepository = new ContestRepository();
class ContestController extends Controller {
  constructor() {
    super();
  }
  getAllContests = async (req, res) => {
    let result = await contestRepository.getAllContests();
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json(result);
    }
  };
  getAllPublishedContests = async (req, res) => {
    let result = await contestRepository.getAllPublishedContests();
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json(result);
    }
  };
  getMyContests = async (req, res) => {
    let result = await contestRepository.getMyContests(req.user.userId);
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json(result);
    }
  };
  getMyOwnContests = async (req, res) => {
    let result = await contestRepository.getMyOwnContests(req.user.userId);
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json(result);
    }
  };

  getAllSubmissionsByContest = async (req, res) => {
    let result = await contestRepository.getAllSubmissionsByContest(
      req.params.contestId
    );
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json(result);
    }
  };
  getAllSubmissionsByUserAndContest = async (req, res) => {
    let result = await contestRepository.getAllSubmissionsByUserAndContest(
      req.user.userId,
      req.params.contestId
    );
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json(result);
    }
  };

  getAllContestProblemsByContest = async (req, res) => {
    let result = await contestRepository.getAllContestProblemsByContest(
      req.params.contestId
    );
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json(result);
    }
  };
  getAllProblemsByContest = async (req, res) => {
    let result = await contestRepository.getAllProblemsByContest(
      req.params.contestId
    );
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json(result);
    }
  };

  addContest = async (req, res) => {
    let result = await contestRepository.addContest(req.user.userId);
    if (result.success) {
      res.status(201).json(result.data);
    } else {
      res.status(500).json(result);
    }
  };
  updateTitle = async (req, res) => {
    let result = await contestRepository.updateTitle(
      req.params.contestId,
      req.body.title
    );
    if (result.success) {
      res.status(204).json(result.data);
    } else {
      res.status(500).json(result);
    }
  };
  updateDescription = async (req, res) => {
    let result = await contestRepository.updateDescription(
      req.params.contestId,
      req.body.description
    );
    if (result.success) {
      res.status(204).json(result.data);
    } else {
      res.status(500).json(result);
    }
  };

  publishContest = async (req, res) => {
    let result = await contestRepository.publishContest(req.params.contestId);
    if (result.success) {
      res.status(204).json(result.data);
    } else {
      res.status(500).json(result);
    }
  };
  startContest = async (req, res) => {
    let result = await contestRepository.startContest(req.params.contestId);
    if (result.success) {
      res.status(204).json(result.data);
    } else {
      res.status(500).json(result);
    }
  };
  endContest = async (req, res) => {
    let result = await contestRepository.endContest(req.params.contestId);
    if (result.success) {
      res.status(204).json(result.data);
    } else {
      res.status(500).json(result);
    }
  };

  addCollaborator = async (req, res) => {
    let result = await contestRepository.addCollaborator(
      req.params.contestId,
      req.body.collaboratorId
    );
    if (result.success) {
      res.status(204).json(result.data);
    } else {
      res.status(500).json(result);
    }
  };
  showAllCollaborators = async (req, res) => {
    let result = await contestRepository.showAllCollaborators(
      req.params.contestId
    );
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json(result);
    }
  };

  addProblemToContest = async (req, res) => {
    let result = await contestRepository.addProblemToContest(
      req.body.problemId,
      req.params.contestId
    );
    if (result.success) {
      res.status(204).json(result.data);
    } else {
      res.status(500).json(result);
    }
  };
  makeProblemEligible = async (req, res) => {
    let result = await contestRepository.makeProblemEligible(
      req.body.problemId,
      req.params.contestId
    );
    if (result.success) {
      res.status(204).json(result.data);
    } else {
      res.status(500).json(result);
    }
  };
  makeProblemNotEligible = async (req, res) => {
    let result = await contestRepository.makeProblemNotEligible(
      req.body.problemId,
      req.params.contestId
    );
    if (result.success) {
      res.status(204).json(result.data);
    } else {
      res.status(500).json(result);
    }
  };

  addSubmissionToContest = async (req, res) => {
    console.log(req.user.userId);
    let result = await contestRepository.addSubmissionToContest(
      req.body.problemId,
      req.params.contestId,
      req.body.submissionId,
      req.user.userId,
      req.body.points
    );
    if (result.success) {
      res.status(204).json(result.data);
    } else {
      res.status(500).json(result);
    }
  };

  //new ones...

  deleteProblem = async (req, res) => {
    let result = await contestRepository.deleteProblem(
      req.params.contestId,
      req.body.problemId
    );
    if (result.success) {
      res.status(204).json(result.data);
    } else {
      res.status(500).json(result);
    }
  };

  deleteContest = async (req, res) => {
    let result = await contestRepository.deleteContest(req.params.contestId);
    if (result.success) {
      res.status(204).json(result.data);
    } else {
      res.status(500).json(result);
    }
  };

  leaveUpcomingContest = async (req, res) => {
    let result = await contestRepository.leaveUpcomingContest(
      req.user.userId,
      req.params.contestId
    );
    if (result.success) {
      res.status(204).json(result.data);
    } else {
      res.status(500).json(result);
    }
  };
  participateUpcomingContest = async (req, res) => {
    let result = await contestRepository.participateUpcomingContest(
      req.user.userId,
      req.params.contestId
    );
    if (result.success) {
      res.status(201).json(result.data);
    } else {
      res.status(500).json(result);
    }
  };
  participateVirtualContest = async (req, res) => {
    let result = await contestRepository.participateVirtualContest(
      req.user.userId,
      req.params.contestId
    );
    if (result.success) {
      res.status(201).json(result.data);
    } else {
      res.status(500).json(result);
    }
  };
  leaveVirtualContest = async (req, res) => {
    let result = await contestRepository.leaveVirtualContest(
      req.user.userId,
      req.params.contestId
    );
    if (result.success) {
      res.status(204).json(result.data);
    } else {
      res.status(500).json(result);
    }
  };

  showAllLiveContestByUser = async (req, res) => {
    let result = await contestRepository.showAllLiveContestByUser(
      req.user.userId
    );
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json(result);
    }
  };
  showAllVirtualContestByUser = async (req, res) => {
    let result = await contestRepository.showAllVirtualContestByUser(
      req.user.userId
    );
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json(result);
    }
  };

  showLiveParticipantList = async (req, res) => {
    let result = await contestRepository.showLiveParticipantList(
      req.params.contestId
    );
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json(result);
    }
  };
  showVirtualParticipantList = async (req, res) => {
    let result = await contestRepository.showVirtualParticipantList(
      req.params.contestId
    );
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json(result);
    }
  };

  addClarification = async (req, res) => {
    let result = await contestRepository.addClarification(
      req.params.contestId,
      req.body.title,
      req.body.description
    );
    if (result.success) {
      res.status(201).json(result.data);
    } else {
      res.status(500).json(result);
    }
  };

  showAllClarifications = async (req, res) => {
    let result = await contestRepository.showAllClarifications(
      req.params.contestId
    );
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json(result);
    }
  };
}

module.exports = ContestController;