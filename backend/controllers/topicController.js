const Controller = require("./base");
const TopicRepository = require("../repositories/topicRepository");
const topicRepository = new TopicRepository();
class TopicController extends Controller {
  constructor() {
    super();
  }
  getAllTopics = async (req, res) => {
    this.handleRequest(res, async () => {
      const topics = await topicRepository.getAllTopics();
      res.status(200).send(topics);
    });
  };
  getTopicById = async (req, res) => {
    this.handleRequest(res, async () => {
      const topic = await topicRepository.getTopicById(req.params.id);
      if (!topic) {
        res.status(404).json({ error: "Topic not found" });
      } else {
        res.status(200).json(topic);
      }
    });
  };
  createTopic = async (req, res) => {
    this.handleRequest(res, async () => {
      const newTopic = await topicRepository.createTopic(req.body);
      res.status(201).json(newTopic);
    });
  };

  updateTopic = async (req, res) => {
    this.handleRequest(res, async () => {
      const updatedTopic = await topicRepository.updateTopic(
        req.params.id,
        req.body
      );
      if (!updatedTopic) {
        res.status(404).json({ error: "Topic not found" });
      } else {
        res.status(200).json(updatedTopic);
      }
    });
  };

  deleteTopic = async (req, res) => {
    this.handleRequest(res, async () => {
      const deletedTopic = await topicRepository.deleteTopic(req.params.id);
      if (!deletedTopic) {
        res.status(404).json({ error: "Topic not found" });
      } else {
        res.status(200).json({ message: "Topic deleted successfully" });
      }
    });
  };
}

module.exports = TopicController;