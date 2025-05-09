import { parse } from "date-fns";
interface RawJournal {
    id: string;
    title: string;
    content: string;
    rawcontent: string;
    tags: string;
    created_at: string;
    updated_at: string;
}

class RawJournal implements RawJournal {
    constructor(
        id: string,
        title: string,
        content: string,
        rawcontent: string,
        tags: string,
        created_at: string,
        updated_at: string
    ) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.rawcontent = rawcontent;
        this.tags = tags;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

}

const toJournal = (j: RawJournal): Journal => {
    console.log("RawJournal ===> ", j.created_at);
    return new Journal(
        j.id,
        j.title,
        j.content,
        JSON.parse(j.rawcontent),
        j.tags.split(" "),
        new Date(j.created_at.replace(" ", "T")),
        new Date(j.updated_at.replace(" ", "T")) 
    );
};

const toRawJournal = (j: Journal): RawJournal => {
    return new RawJournal(
        j.id,
        j.title,
        j.content,
        JSON.stringify(j.rawcontent),
        j.tags.join(" "),
        j.created_at.toISOString(),
        j.updated_at.toISOString()
    );
}
interface Journal {
    id: string;
    title: string;
    content: string;
    rawcontent: JSON;
    tags: string[];
    created_at: Date;
    updated_at: Date;
}

class Journal implements Journal {
    constructor(
        id: string,
        title: string,
        content: string,
        rawcontent: JSON,  
        tags: string[],
        created_at: Date,
        updated_at: Date
    ) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.rawcontent = rawcontent;
        this.tags = tags;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

}


interface Media {
  journalId: string;
  customEnabled: boolean;
  backgroundImage: string | null;
  isBgEnabled: boolean;
  primaryColor: string | null;
  secondaryColor: string | null;
  textColor: string | null;
  song: string | null;
  fontTitle: string | null;
  fontBody: string | null;
}

class Media implements Media {
  constructor(
    journalId: string,
    customEnabled: boolean,
    backgroundImage: string | null,
    isBgEnabled: boolean,
    primaryColor: string | null,
    secondaryColor: string | null,
    textColor: string | null,
    song: string | null,
    fontTitle: string | null,
    fontBody: string | null
  ) {
    this.journalId = journalId;
    this.customEnabled = customEnabled;
    this.backgroundImage = backgroundImage;
    this.isBgEnabled = isBgEnabled;
    this.primaryColor = primaryColor;
    this.secondaryColor = secondaryColor;
    this.textColor = textColor;
    this.song = song;
    this.fontTitle = fontTitle;
    this.fontBody = fontBody;
  }
}

export { RawJournal, Journal , toJournal, toRawJournal};