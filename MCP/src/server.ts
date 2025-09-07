import {
  McpServer,
  ResourceTemplate,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CreateMessageResultSchema } from "@modelcontextprotocol/sdk/types.js";
import { writeFile } from "fs/promises";
import z from "zod";
import {
  addIssueComment,
  assignUserToIssue,
  changeIssueStatus,
  createFESubtask,
  getIssueDetails,
} from "./utils/jira";
import { runCommand } from "./utils/terminal";
import { createGitBranch } from "./utils/github";
const server = new McpServer({
  name: "test",
  version: "1.0.0",
  capabilities: {
    resources: true,
    tools: true,
    prompts: false,
  },
});

server.tool(
  "get-issue-details",
  "Get the details of a specific jira issue",
  {
    issueId: z.string(),
  },
  {
    title: "Get Issue Details",
    readOnlyHint: false,
    destructiveHint: false,
    idempotentHint: false,
    openWorldHint: true,
  },
  async ({ issueId }) => {
    try {
      const targetIssue = await getIssueDetails(issueId);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(targetIssue, null, 2),
          },
        ],
      };
    } catch (err: any) {
      return {
        content: [
          {
            type: "text",
            text: `Something went wrong while getting the specified issue details ${err?.message}`,
          },
        ],
      };
    }
  }
);

// Create Github branch
server.tool(
  "create-branch",
  "Create a new github branch for the current repo",
  {
    branchName: z.string(),
  },
  { title: "Create a new github branch", destructiveHint: true },
  async ({ branchName }) => {
    const result = await createGitBranch(branchName);
    return {
      content: [{ type: "text", text: result.message }],
    };
  }
);

// Change issue status
server.tool(
  "change-jira-status",
  "Change Jira issue status",
  { issueId: z.string(), status: z.enum(["To Do", "In Progress", "Done"]) },
  { title: "Change the status of a jira issue" },
  async ({ issueId, status }) => {
    await changeIssueStatus(issueId, status);
    return {
      content: [
        { type: "text", text: `🔄 Issue ${issueId} moved to ${status}` },
      ],
    };
  }
);

server.tool(
  "create-user",
  "Create a new user in the database",
  {
    name: z.string(),
    email: z.string(),
    address: z.string(),
    phone: z.string(),
  },
  {
    title: "Create User",
    readOnlyHint: false,
    destructiveHint: false,
    idempotentHint: false,
    openWorldHint: true,
  },
  async (params) => {
    try {
      const id = await createUser(params);
      return {
        content: [
          {
            type: "text",
            text: `User with ${id} id created successfully`,
          },
        ],
      };
    } catch (err) {
      return {
        content: [
          {
            type: "text",
            text: "Failed to save user",
          },
        ],
      };
    }
  }
);

// Developing New Feature
server.tool(
  "init-feature",
  "Start Development of a new feature",
  {
    issueId: z.string(),
  },
  {
    title: "Create a New Feature ",
    readOnlyHint: false,
    destructiveHint: false,
    idempotentHint: false,
    openWorldHint: true,
  },
  async ({ issueId }) => {
    try {
      //1. Getting the details for the jira issue.
      const targetIssue = await getIssueDetails(issueId);

      //2. Creating Github Branch for the issue
      const branchName = `${targetIssue?.key}-${targetIssue?.fields?.summary
        ?.split(" ")
        .join("-")
        .toUpperCase()}`;
      const branchResult = await createGitBranch(branchName);
      if (!branchResult.success) {
        return {
          content: [{ type: "text", text: branchResult.message }],
        };
      }
      // 3. Create a child Issue for FE
      const FE_CHILD = targetIssue?.fields?.subtasks?.find(
        (subtask: any) => subtask?.fields?.summary?.toLowerCase() === "fe"
      );
      const HAS_FE_CHILD = !!FE_CHILD;
      if (HAS_FE_CHILD) {
        await changeIssueStatus(FE_CHILD?.key, "In Progress");
        await assignUserToIssue(FE_CHILD?.key);
      } else {
        const res = (await createFESubtask(issueId)) as any;
        await changeIssueStatus(res?.subtaskKey, "In Progress");
        await assignUserToIssue(res?.subtaskKey);
      }
      await changeIssueStatus(issueId, "In Progress");
      return {
        content: [
          {
            type: "text",
            text: "JIRA Issue Found and status will be converted to In Progress",
          },
        ],
      };
    } catch {
      return {
        content: [
          {
            type: "text",
            text: "Something went wrong while updating your jira status",
          },
        ],
      };
    }
  }
);

// Creating a PR For a feature
server.tool(
  "create-pr",
  "Create a Pull request for the currently under development feature.",
  {
    issueId: z.string(),
  },
  {
    title: "Create a New Feature ",
    readOnlyHint: false,
    destructiveHint: false,
    idempotentHint: false,
    openWorldHint: true,
  },
  async ({ issueId }) => {
    await addIssueComment(issueId, "PR_CREATION");
    return {
      content: [
        {
          type: "text",
          text: "JIRA Issue Found and status will be converted to In Progress",
        },
      ],
    };
  }
);

server.tool(
  "create-random-user",
  "Generate a random user and store in the database",
  {
    title: "Generate Random User",
    readOnlyHint: false,
    destructiveHint: false,
    idempotentHint: false,
    openWorldHint: true,
  },
  async () => {
    const res = await server.server.request(
      {
        method: "sampling/createMessage",
        params: {
          messages: [
            {
              role: "user",
              content: {
                type: "text",
                text: "Generate fake user data. The user should have a unique and realistic name (in Arabic), email, address (in Egypt), and phone number. Return this data as a JSON object with no other text or formatter so it can be used with JSON.parse.",
              },
            },
          ],
          maxTokens: 1024,
        },
      },
      CreateMessageResultSchema
    );
    if (res.content.type !== "text") {
      return {
        content: [
          {
            type: "text",
            text: "Failed to generate user",
          },
        ],
      };
    }
    const newUser = JSON.parse(
      res.content.text
        .trim()
        .replace(/^```json/, "")
        .replace(/```$/, "")
        .trim()
    );
    try {
      const id = await createUser(newUser);
      return {
        content: [
          {
            type: "text",
            text: `User with ${id} id created successfully`,
          },
        ],
      };
    } catch (err) {
      return {
        content: [
          {
            type: "text",
            text: "Failed to save user",
          },
        ],
      };
    }
  }
);

server.resource(
  "users",
  "users://all",
  {
    description: "All users in the database",
    title: "Users",
    mimeType: "application/json",
  },
  async (uri) => {
    const users = await import("./data/users.json", {
      with: { type: "json" },
    }).then((m) => m.default);
    return {
      contents: [
        {
          uri: uri.href,
          mimeType: "application/json",
          text: JSON.stringify(users, null, 2),
        },
      ],
    };
  }
);

async function createUser(params: {
  name: string;
  email: string;
  address: string;
  phone: string;
}) {
  const currentUsers = await import("./data/users.json", {
    with: { type: "json" },
  }).then((m) => m.default);
  const id = currentUsers.length + 1;
  currentUsers.push({ id, ...params });
  await writeFile(
    "./src/data/users.json",
    JSON.stringify(currentUsers, null, 2)
  );
  return id;
}

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

server.resource(
  "user-details",
  new ResourceTemplate("users://{userId}/profile", { list: undefined }),
  {
    description: "Profile details of a user",
    title: "User Profile",
    mimeType: "application/json",
  },
  async (uri, { userId }) => {
    const users = await import("./data/users.json", {
      with: { type: "json" },
    }).then((m) => m.default);
    const user = users.find((user) => user.id === Number(userId));
    if (!user)
      return {
        contents: [
          {
            uri: uri.href,
            type: "text",
            text: JSON.stringify({ error: "User not found" }),
            mimeType: "application/json",
          },
        ],
      };
    return {
      contents: [
        {
          uri: uri.href,
          type: "text",
          text: JSON.stringify(user, null, 2),
          mimeType: "application/json",
        },
      ],
    };
  }
);

server.prompt(
  "create-fake-user",
  "Generate fake user data for a given name",
  {
    name: z.string(),
  },
  ({ name }: { name: string }) => {
    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `Generate a fake user profile for the name ${name} with email, address, and phone number in JSON format.`,
          },
        },
      ],
    };
  }
);

main();
