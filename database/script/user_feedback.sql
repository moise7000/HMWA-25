CREATE TABLE user_feedbacks (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL,
    course_id uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    comment text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),

    UNIQUE (user_id, course_id),

    CONSTRAINT fk_feedback_user FOREIGN KEY (user_id) REFERENCES profiles(user_id) ON DELETE CASCADE
);
