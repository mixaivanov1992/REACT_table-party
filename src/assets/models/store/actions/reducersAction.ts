import { ChapterAction } from '@models/store/reducer/chapterReducer';
import { LoaderAction } from '@models/store/reducer/loaderReducer';
import { PersonalDataAction } from '@models/store/reducer/personalDataReducer';
import { RuleAction } from '@models/store/reducer/ruleReducer';
import { SheetAction } from '@models/store/reducer/sheetReducer';

export type ReducersActions = ChapterAction | SheetAction | RuleAction | PersonalDataAction | LoaderAction;
