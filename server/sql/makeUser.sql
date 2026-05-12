USE `middenbeemster_Smidse`;

INSERT INTO UserAdmin 
    (username, passwordHash) 
VALUES 
    ('admin', 'adminpassword'), -- $argon2id$v=19$m=65536,t=3,p=4$Z3tDBmzwA5cEZuQX4gC95g$n85FmFGAiKXHpgDdPJoyi6Yvrq88Z7VkXdjJ1ndty5M
    ('jasper', 'password123'); -- $argon2id$v=19$m=65536,t=3,p=4$nOoDP4n6KycpiZEUD32alw$6H6OHy9OBT855biJb9Zkx/8z14F3PM7Tcm8G4JPWvRM