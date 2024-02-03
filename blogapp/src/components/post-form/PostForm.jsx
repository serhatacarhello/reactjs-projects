import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "../Button";
import RTE from "../RTE";
import Select from "../Select";
import Input from "../Input";
import appwriteService from "../../appwrite/config";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function PostForm({ post }) {
  console.log("🚀 ~ PostForm ~ post:", post);
  //?react hook form => control used for 3rd party Components
  const { register, handleSubmit, watch, setValue, control, reset } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    if (post) {
      // If it's an existing post, update the featured image
      const file = data.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;

      if (file) {
        // If a new file is uploaded, delete the old featured image
        await appwriteService.deleteFile(post.featuredImage);
      }

      // Update the post with the new data
      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      // If the update is successful, navigate to the updated post
      if (dbPost) navigate(`/post/${dbPost.$id}`);
    } else {
      // If it's a new post, upload the featured image
      const file = await appwriteService.uploadFile(data.image[0]);

      if (file) {
        // If the file upload is successful, create a new post in the database
        const fileId = file.$id;
        data.featuredImage = fileId;

        const dbPost = await appwriteService.createPost({
          ...data,
          userId: userData.$id,
        });

        // If the creation is successful, navigate to the new post
        if (dbPost) navigate(`/post/${dbPost.$id}`);
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/gi, "-")
        .replace(/\s/g, "-");
  }, []);

  useEffect(() => {
    watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), {
          shouldValidate: true,
        });
      }
    });
  }, [watch, slugTransform, setValue]);

  useEffect(() => {
    // Reset the form when post prop changes to reapply defaultValues
    reset({
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",
    });
  }, [post, reset]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label={"Title"}
          placeholder="Title"
          defaultValue={post?.title}
          className={"mb-4"}
          {...register("title", { required: true, maxLength: 50 })}
        />
        <Input
          label="Slug"
          placeholder="Slug"
          defaultValue={post?.$id}
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />

        <RTE
          label={"Content: "}
          name="content"
          control={control}
          defaultValue={post?.content}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image "
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}

        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />

        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : "bg-orange-500"}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}
