import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { BlockList } from "net";

const postsDirectory = path.join(process.cwd(), "posts");

// Extract the *.md file datas
export function getPostsData() {
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) => {
        const id = fileName.replace(/\.md$/, ""); // fileName(id)

        // Read the MD as string
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf-8");
        const matterResult = matter(fileContents);

        // returns id and metadata

        return {
            id, 
            ...matterResult.data,
        }; // id もプロパティに追加されたオブジェクトを返す

    });
    return allPostsData;
}

// getStaticPathのreturnで使うpathを取得する
export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames.map((fileName) => {
        return {
            params: {
                id: fileName.replace(/\.md$/, ""),
            }, 
        };
    });
    // 以下のような配列を返す
    // [
    //     {
    //         params: {
    //             id: "ssg-ssr"
    //         }
    //     },
    //     {
    //         {
    //             params: {
    //                 id: "next-react"
    //             }
    //         }
    //     },
    //     {
    //         params: {
    //             id: "react-routing"
    //         }
    //     }
    
    // ]
}

export async function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContent = fs.readFileSync(fullPath, "utf-8");

    const matterResult = matter(fileContent);

    const blogContent =  await remark().use(html).process(matterResult.content) // string
    const blogContentHTML = blogContent.toString();

    return {
        id, 
        blogContentHTML,
        ...matterResult.data,
    };
}
