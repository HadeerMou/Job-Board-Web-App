export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          role: string;
          full_name: string;
        };
      };
      jobs: {
        Row: {
          id: number;
          title: string;
          company: string;
          description: string;
        };
      };
      applications: {
        Row: {
          id: number;
          user_id: string;
          job_id: number;
          cover_letter: string;
        };
      };
    };
  };
}
