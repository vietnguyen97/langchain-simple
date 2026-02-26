import { exec } from "child_process";
import dayjs from "dayjs";

// Hàm chạy lệnh shell
function runCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(stderr || error.message);
      } else {
        resolve(stdout.trim());
      }
    });
  });
}

// Kiểm tra có thay đổi không
async function hasChanges() {
  const status = await runCommand("git status --porcelain");
  return status.length > 0;
}

// Hàm chính
async function autoCommit(customMessage) {
  try {
    const changesExist = await hasChanges();

    if (!changesExist) {
      console.log("⚠️ Không có thay đổi nào để commit.");
      return;
    }

    console.log("🤖 Đang chạy git add...");
    await runCommand("git add .");

    const timestamp = dayjs().format("YYYY-MM-DD HH:mm:ss");

    const commitMessage =
      customMessage ||
      `chore: auto commit at ${timestamp}`;

    console.log("🤖 Đang tạo commit...");
    await runCommand(`git commit -m "${commitMessage}"`);

    const currentBranch = await runCommand("git branch --show-current");

    console.log(`🤖 Đang push lên '${currentBranch}'...`);
    await runCommand(`git push origin ${currentBranch}`);

    console.log(`✅ Commit & push thành công lên '${currentBranch}'`);
  } catch (error) {
    console.error("❌ Lỗi:", error);
  }
}

// Lấy message từ command line
const customMessage = process.argv.slice(2).join(" ");
autoCommit(customMessage);