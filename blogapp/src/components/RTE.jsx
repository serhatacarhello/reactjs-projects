import React from "react";
import { Controller } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";
import conf from "../conf/conf";
export default function RTE({ name, control, label, defaultValue = "" }) {

  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1 pl-1">{label} </label>}

      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            apiKey={conf.tinymce_editor_api_key}
            initialValue={defaultValue}
            init={{
              branding: false,
              height: 500,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | " +
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              menu: {
                favs: {
                  title: "My Favorites",
                  items: "code visualaid | searchreplace | emoticons",
                },
              },
              menubar: "favs file edit view insert format tools table help",
              content_css: "css/content.css",
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}
