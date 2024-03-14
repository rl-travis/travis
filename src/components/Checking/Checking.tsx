import styles from "./Checking.module.scss";
import { Check, Loader2Icon, Plus } from "lucide-react";
import { useInter } from "@/hooks/useInter";

type PropsType = {
  isBusy: boolean;
  isChecking: boolean;
  value: string;
};
export default function Checking({ value, isBusy, isChecking }: PropsType) {
  const { i18n } = useInter();

  return (
    <div className={styles.wrapper}>
      {value.length >= 5 && (
        <>
          {isChecking && (
            <div className={styles.checking}>
              <Loader2Icon size={12} className={styles.lucide} />
              <span>{i18n.profile.check}</span>
            </div>
          )}
          {isBusy && (
            <div className={styles.busy}>
              <Plus size={12} className={styles.lucidePlus} />
              <span>{i18n.profile.busy}</span>
            </div>
          )}
          {!isChecking && !isBusy && (
            <div className={styles.free}>
              <Check width={12} height={12} />
              <span>{i18n.profile.free}</span>
            </div>
          )}
        </>
      )}
    </div>
  );
}
