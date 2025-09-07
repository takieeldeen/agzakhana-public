import axios from "axios";
import { runCommand } from "./terminal";
import dotenv from "dotenv";
import { endpoints, githubAxios } from "./axios";

dotenv.config();

export async function createGitBranch(branchName: string) {
  try {
    await runCommand(`git checkout -b ${branchName} origin/main`);
    return { success: true, message: `✅ Branch ${branchName} created.` };
  } catch (err: any) {
    return {
      success: false,
      message: `Something went wrong while creating branch: ${err?.message}`,
    };
  }
}

export async function createPullRequest(
  branchName: string,
  title: string,
  body: string
) {
  const URL = endpoints.github.pullRequests;
  console.log(URL);
  await githubAxios.post(URL, {
    title,
    body,
    head: branchName,
    base: "main",
  });
}
