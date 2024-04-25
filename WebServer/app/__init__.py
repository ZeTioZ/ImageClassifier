import os


def get_parent_path(path: str, level: int = 1) -> str:
    """Return the parent path of the path."""
    for _ in range(level):
        path = os.path.dirname(path)
    return path


root_path = get_parent_path(__file__, 3)
join_char = os.path.sep
extracted_path = f'{root_path}{join_char}AI{join_char}extracted{join_char}'
resources_path = f'{root_path}{join_char}AI{join_char}resources{join_char}'
uploads_path = f'{root_path}{join_char}WebServer{join_char}uploads{join_char}'
