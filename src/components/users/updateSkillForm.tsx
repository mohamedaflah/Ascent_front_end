import { X } from "lucide-react";
import TechnologyIcon from "../custom/TechIcon";
import { NewLoadingButton } from "../custom/NewLoadingBtn";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { updateSkillSchema } from "@/schema/updateSkill";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { updateProfileUser } from "@/redux/actions/userActions";

interface ChildProp {
  closeModal?: () => void;
}
export function UpdateSkillForm({ closeModal }: ChildProp) {
  closeModal;

  const { setValue, watch, getValues, handleSubmit } = useForm<
    z.infer<typeof updateSkillSchema>
  >({
    resolver: zodResolver(updateSkillSchema),
    defaultValues: {
      skills: [],
    },
  });
  const { loading, user } = useSelector((state: RootState) => state.userData);
  useEffect(() => {
    setValue("skills", user?.skills);
  }, [setValue, user]);
  const [skill, setSKill] = useState<string>("");
  const dispatch: AppDispatch = useDispatch();
  const updateSkillSubmit = async (
    values: z.infer<typeof updateSkillSchema>
  ) => {
    values;
    if (values.skills.length <= 0) {
      return toast.error("Please add atleast one skill");
    }
    await dispatch(
      updateProfileUser({
        userId: user?._id,
        sendData: {
          skills: values.skills,
        },
      })
    );
    closeModal && closeModal();
  };
  return (
    <form className="w-full" onSubmit={handleSubmit(updateSkillSubmit)}>
      <div className="w-full min-h-28 p-1 space-y-2">
        <div className="w-full p-1 h-12 border flex gap-1 rounded-md">
          <input
            type="text"
            className="w-full h-full outline-none bg-transparent px-2"
            placeholder="enter skill and add"
            value={skill}
            onChange={(e) => setSKill(e.target.value)}
          />
          <button
            type="button"
            className="h-full bg-primary w-28 font-semibold rounded-md text-white"
            onClick={() => {
              setValue("skills", [...getValues("skills"), skill]);
              setSKill("");
            }}
          >
            Add
          </button>
        </div>
        <div className="w-full flex flex-wrap gap-1">
          {watch("skills")?.map((value, index) => (
            <div
              key={value}
              className="h-9 min-w-20 flex justify-between gap-2 items-center px-2 bg-backgroundAccent rounded-md"
            >
              <div className="flex gap-1 items-center ">
                <TechnologyIcon technology={value} />
                <span>{value}</span>
              </div>
              <X
                className="w-4 cursor-pointer"
                onClick={() => {
                  setValue(
                    "skills",
                    getValues("skills")?.filter((_, Idx) => Idx !== index)
                  );
                }}
              />
            </div>
          ))}
        </div>
        <div className="h-16 flex items-end">
          <NewLoadingButton loading={loading} type="submit">
            update
          </NewLoadingButton>
        </div>
      </div>
    </form>
  );
}
