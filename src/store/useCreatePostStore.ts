import { validateFileLength } from "@/components/pages/PostForm/validation/validateFileLength";
import { validateFileSize } from "@/components/pages/PostForm/validation/validateFileSize";
import { ApiAnimalType } from "@/types/animal";
import { ApiEmotion } from "@/types/Emotion";
import { create } from "zustand";

interface PreviewImage {
  file: File;
  preview: string;
}

interface ValidationError {
  isValid: boolean;
  message: string;
}

interface ICreatePostState {
  selectedImages: PreviewImage[];
  content: string;
  emotion: ApiEmotion;
  post_type: ApiAnimalType;
  error: ValidationError | null;
}

interface ICreatePostActions {
  addImages: (files: File[]) => Promise<void>;
  removeImage: (index: number) => void;
  setError: (error: ValidationError | null) => void;
  setContent: (content: string) => void;
  setEmotion: (emotion: ApiEmotion) => void;
  setPostType: (postType: ApiAnimalType) => void;
  reset: () => void;
}

const initialState: ICreatePostState = {
  selectedImages: [],
  content: "",
  emotion: ApiEmotion.HAPPY,
  post_type: ApiAnimalType.CAT,
  error: null,
};

const useCreatePostStore = create<ICreatePostState & ICreatePostActions>(
  (set, get) => ({
    ...initialState,
    addImages: async (files) => {
      const currentImages = get().selectedImages;
      const totalImages = currentImages.length + files.length;

      const lengthError = validateFileLength(totalImages);
      if (lengthError) {
        set({ error: lengthError });
        return;
      }

      for (const file of files) {
        const sizeError = validateFileSize(file);
        if (sizeError) {
          set({ error: sizeError });
          return;
        }
      }

      set({ error: null });

      const newImages = await Promise.all(
        files.map(
          (file) =>
            new Promise<PreviewImage>((resolve) => {
              const reader = new FileReader();
              reader.onload = (e: ProgressEvent<FileReader>) => {
                const result = e.target?.result;
                if (result && typeof result === "string") {
                  resolve({ file, preview: result });
                }
              };
              reader.readAsDataURL(file);
            })
        )
      );

      set((state) => ({
        selectedImages: [...state.selectedImages, ...newImages],
      }));
    },
    removeImage: (index) =>
      set((state) => {
        const newImages = [...state.selectedImages];
        newImages.splice(index, 1);
        return { selectedImages: newImages, error: null };
      }),
    setError: (error) => set({ error }),
    setContent: (content) => set({ content }),
    setEmotion: (emotion) => set({ emotion }),
    setPostType: (postType) => set({ post_type: postType }),
    reset: () => set(initialState),
  })
);

export default useCreatePostStore;
