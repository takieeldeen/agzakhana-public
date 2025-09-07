import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const GITHUB_URL = `https://api.github.com/repos/${process?.env?.REPO_OWNER}/${process?.env?.REPO_NAME}`;
const GITHUB_AUTH = `Bearer ${process.env.GITHUB_TOKEN}`;

export const githubAxios = axios.create({
  baseURL: GITHUB_URL, // should be "https://api.github.com/repos/{owner}/{repo}"
  headers: {
    Authorization: `token ${process.env.GITHUB_TOKEN}`, // or `Bearer` both work
    Accept: "application/vnd.github+json",
    "Content-Type": "application/json",
  },
});

console.log(GITHUB_URL, GITHUB_AUTH);

const JIRA_URL = `https://${process.env.JIRA_DOMAIN}.atlassian.net/rest/api/3`;
const JIRA_AUTH = {
  username: process.env.JIRA_USERNAME!,
  password: process.env.JIRA_API_KEY!,
};

export const jiraAxios = axios.create({
  baseURL: JIRA_URL,
  auth: JIRA_AUTH,
});

export const endpoints = {
  github: {
    pullRequests: "/pulls",
  },
};
const URL = endpoints.github.pullRequests;
console.log(URL);
