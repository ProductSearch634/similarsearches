import { createDatabase } from '../database';
export interface dangerLevelDetails {
  id: number;
  level: number;
  keywords: string[];
  specs: {
    specsKey: string;
    specsValue: string;
  }[];
}


export async function getDangerLevelKeywords(): Promise<dangerLevelDetails[] | null> {
  const db = await createDatabase();

  try {
    const queryRunner = db.createQueryRunner();
    const risk_level_details = await queryRunner.query(
      'SELECT * from risk_level_details order by level asc'
    );

    await queryRunner.release();
    return risk_level_details;
  } catch (error) {
    return null;
  }
}
